import { useState } from 'react';
import DataTable from '../../components/DataTable';

interface ProductData {
  id: number;
  estado: boolean;
  name: string;
  price: number;
  category: string;
  image: string;
}

const ProductPage = () => {
    const [data, setData] = useState<ProductData[]>([
        { id: 1, estado: true, name: 'Apple iPhone 13', price: 799.99, category: 'Electronics', image: 'https://via.placeholder.com/100' },
        { id: 2, estado: false, name: 'Samsung Galaxy S21', price: 699.99, category: 'Electronics', image: 'https://via.placeholder.com/100' },
        { id: 3, estado: true, name: 'Sony Noise Cancelling Headphones', price: 349.99, category: 'Electronics', image: 'https://via.placeholder.com/100' },
        { id: 4, estado: true, name: 'MacBook Air M1', price: 999.99, category: 'Electronics', image: 'https://via.placeholder.com/100' },
        { id: 5, estado: false, name: 'Nike Air Max 270', price: 150.00, category: 'Footwear', image: 'https://via.placeholder.com/100' },
        { id: 6, estado: true, name: 'Adidas Ultraboost', price: 180.00, category: 'Footwear', image: 'https://via.placeholder.com/100' },
        { id: 7, estado: true, name: 'Levi\'s Jeans', price: 45.99, category: 'Apparel', image: 'https://via.placeholder.com/100' },
        { id: 8, estado: false, name: 'H&M T-Shirt', price: 19.99, category: 'Apparel', image: 'https://via.placeholder.com/100' },
        { id: 9, estado: true, name: 'Ray-Ban Sunglasses', price: 154.99, category: 'Accessories', image: 'https://via.placeholder.com/100' },
        { id: 10, estado: false, name: 'Gucci Handbag', price: 1200.00, category: 'Accessories', image: 'https://via.placeholder.com/100' },
        { id: 11, estado: true, name: 'Samsung QLED TV', price: 749.99, category: 'Electronics', image: 'https://via.placeholder.com/100' },
        { id: 12, estado: true, name: 'Dell XPS 13', price: 999.99, category: 'Electronics', image: 'https://via.placeholder.com/100' },
        { id: 13, estado: false, name: 'Apple Watch Series 6', price: 399.99, category: 'Electronics', image: 'https://via.placeholder.com/100' },
        { id: 14, estado: true, name: 'Sony PlayStation 5', price: 499.99, category: 'Gaming', image: 'https://via.placeholder.com/100' },
        { id: 15, estado: true, name: 'Nintendo Switch', price: 299.99, category: 'Gaming', image: 'https://via.placeholder.com/100' }
      ]);
      

  const [currentPage, setCurrentPage] = useState(0);

  const handleEdit = async (id: number) => {
    alert(`Editing product with ID: ${id}`);
  };

  const handleDelete = async (id: number) => {
    setData(data.filter(item => item.id !== id));
  };

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    setData(data.map(item =>
      item.id === id ? { ...item, estado: !currentStatus } : item
    ));
  };

  const handleCreate = () => {
    alert('Create new product');
  };

  const renderRow = (row: ProductData) => [
    row.id,
    <img key={`img-${row.id}`} src={row.image} alt={row.name} className="w-12 h-12 object-cover rounded-md" />,
    row.name,
    row.price.toFixed(2),
    row.category,
    row.estado ? 'Available' : 'Not Available',
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Product List</h1>
        <button
          onClick={handleCreate}
          className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition-all"
        >
          Create New Product
        </button>
      </div>
      <DataTable
        data={data}
        currentPage={currentPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        renderRow={renderRow}
        columns={['ID', 'Image', 'Name', 'Price', 'Category', 'Status']}
        pageSize={5}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductPage;
