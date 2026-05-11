export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-[#e4e4e7] text-[#000000] shadow-sm focus:ring-[#000000] ' +
                className
            }
        />
    );
}
