import { Button } from '../ui/button'
import { useTheme } from '../../lib/theme-provider'
import { DarkIcon, LightIcon } from '../icons/icon'

export function ModeToggle() {
    const { toggleTheme, theme } = useTheme()

    return (
        <Button
            variant="outline"
            size="md"
            onClick={toggleTheme}
        >
            {theme === 'light' ? (
                <DarkIcon className="h-[1.2rem] w-[1.2rem]" />
            ) : (
                <LightIcon className="h-[1.2rem] w-[1.2rem] text-white" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}