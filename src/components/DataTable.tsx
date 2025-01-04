import React, { useState, useCallback, useEffect } from 'react';
import Dropdown from './ui/Dropdown';
import { ActiveIcon, EditIcon, PaginationendminorIcon, PaginationstartminorIcon, SearchIcon, TrashIcon, XIcon } from './icon/icon';

interface HasEstado {
    id: number;
    estado: boolean;
}

interface DataTableProps<T extends HasEstado> {
    data: T[];
    currentPage: number;
    onEdit: (id: number) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
    onToggleStatus: (id: number, currentStatus: boolean) => Promise<void>;
    renderRow: (row: T) => (string | number | boolean | React.ReactNode)[];
    columns: string[];
    searchPlaceholder?: string;
    pageSize: number;
    pageSizeOptions?: number[];
    onPageSizeChange?: (size: number) => void;
    onPageChange?: (newPage: number) => void;
    onSearchChange?: (searchTerm: string) => void;
}

const DataTable = <T extends HasEstado>({
    data,
    currentPage,
    onEdit,
    onDelete,
    onToggleStatus,
    renderRow,
    columns,
    searchPlaceholder = 'Buscar...',
    pageSize: initialPageSize,
    pageSizeOptions = [5, 10, 20, 30],
    onPageSizeChange,
    onPageChange,
    onSearchChange,
}: DataTableProps<T>) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [pageSize, setPageSize] = useState<number>(initialPageSize);
    const [visibleColumns, setVisibleColumns] = useState<string[]>(columns);

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value);
            if (onSearchChange) onSearchChange(e.target.value);
        },
        [onSearchChange]
    );

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = Number(e.target.value);
        setPageSize(newSize);
        if (onPageSizeChange) onPageSizeChange(newSize);
        if (onPageChange) onPageChange(0);
    };

    useEffect(() => {
        if (onPageSizeChange) {
            onPageSizeChange(pageSize);
        }
    }, [pageSize, data.length, onPageSizeChange]);

    const filteredData = data.filter((row) =>
        columns.some((column) => {
            const value = renderRow(row)[columns.indexOf(column)];
            return typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase());
        })
    );

    const paginatedData = filteredData.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

    const paginationButtons = () => {
        const pagesToShow = [];
        for (let i = 0; i < Math.ceil(filteredData.length / pageSize); i++) {
            pagesToShow.push(i);
        }
        return pagesToShow;
    };

    return (
        <div className="space-y-6 px-8">
            <div className="flex items-center justify-between space-x-4">
                <div className="relative w-full sm:w-2/3 md:w-1/2">
                    <label htmlFor="search" className="block text-sm font-medium">
                        Buscar:
                    </label>
                    <div className="relative">
                        <input
                            id="search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full p-2 pl-10 pr-3 border rounded-md"
                            placeholder={searchPlaceholder}
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            {SearchIcon({ className: 'text-gray-500 w-5 h-5' })}
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0">
                    <Dropdown
                        items={columns.map((column) => ({ label: column, value: column }))}
                        onSelect={(value) => {
                            const column = value as string;
                            setVisibleColumns((prevColumns) =>
                                prevColumns.includes(column)
                                    ? prevColumns.filter((col) => col !== column)
                                    : [...prevColumns, column]
                            );
                        }}
                        selectedValue={""}
                    />
                </div>
            </div>
            <div className="overflow-x-auto rounded-lg shadow-lg border bg-white max-w-full">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr>
                            {columns.map(
                                (column, index) =>
                                    visibleColumns.includes(column) && (
                                        <th key={`header-${index}`} className="py-2 px-4 text-sm font-semibold text-gray-700">
                                            {column}
                                        </th>
                                    )
                            )}
                            <th className="py-2 px-4 text-sm font-semibold text-gray-700">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="text-center py-4 text-sm text-gray-500">
                                    No se encontraron resultados.
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                                    {columns.map(
                                        (_, columnIndex) =>
                                            visibleColumns.includes(columns[columnIndex]) && (
                                                <td key={`${row.id}-cell-${columnIndex}`} className="py-3 px-4 text-sm text-gray-600">
                                                    {renderRow(row)?.[columnIndex] ?? '-'}
                                                </td>
                                            )
                                    )}
                                    <td className="py-3 px-4 text-sm flex space-x-2 items-center">
                                        <button
                                            onClick={() => onEdit(row.id)}
                                            className="text-blue-600 hover:bg-blue-100 p-1 rounded-md"
                                        >
                                            {EditIcon({ className: 'w-5 h-5 text-blue-600' })}
                                        </button>

                                        <button
                                            onClick={() => onDelete(row.id)}
                                            className="text-red-600 hover:bg-red-100 p-1 rounded-md"
                                        >
                                            {TrashIcon({ className: 'w-5 h-5 text-red-600' })}
                                        </button>

                                        <button
                                            onClick={() => onToggleStatus(row.id, row.estado)}
                                            className={`p-1 rounded-md ${row.estado ? 'text-green-600 hover:bg-green-100' : 'text-red-600 hover:bg-red-100'}`}
                                        >
                                            {row.estado ? ActiveIcon({ className: 'w-5 h-5 text-green-600' }) : XIcon({ className: 'w-5 h-5 text-red-600' })}
                                        </button>

                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                <div className="flex items-center ml-2 space-x-2">
                    <label htmlFor="pageSize" className="text-sm font-medium">
                        Mostrar
                    </label>
                    <select
                        id="pageSize"
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        className="p-2 border rounded-md"
                    >
                        {pageSizeOptions.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                    <span className="text-sm font-medium">por página</span>
                </div>

                <div className="flex justify-center items-center space-x-2 flex-wrap w-full sm:w-auto mb-4">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange && onPageChange(currentPage - 1);
                        }}
                        disabled={currentPage <= 0}
                        className="px-3 py-1 text-sm font-medium disabled:opacity-50 hover:bg-gray-200 hover:text-black rounded-md"
                    >
                        {PaginationendminorIcon({ className: 'w-5 h-5 transform rotate-180' })}
                    </button>

                    {paginationButtons().map((item, index) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange && onPageChange(item);
                            }}
                            className={`px-3 py-1 text-sm font-medium rounded-md ${currentPage === item ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            {item + 1}
                        </button>
                    ))}

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange && onPageChange(currentPage + 1);
                        }}
                        disabled={currentPage >= Math.ceil(filteredData.length / pageSize) - 1}
                        className="px-3 py-1 text-sm font-medium disabled:opacity-50 hover:bg-gray-200 hover:text-black rounded-md"
                    >
                        {PaginationstartminorIcon({ className: 'w-5 h-5 transform rotate-180' })}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
