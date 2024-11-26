type MyButtonColor = 'blue' | 'green' | 'gray';
interface MyButtonProps { label: string, type?: 'button' | 'submit', color?: MyButtonColor, onBtnClick?: () => void };

const MyButton = ({ label, type = 'button', color = 'blue', onBtnClick }: MyButtonProps) => {
    return (
        <button type={type} onClick={onBtnClick} className={`px-4 py-2 bg-${color}-500 text-white font-semibold rounded-lg hover:bg-${color}-700`} >
            {label}
        </button>
    )
}

export default MyButton


