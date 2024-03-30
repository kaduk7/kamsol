
export const metadata = {
    title: "Data Admin",
}

function LayoutUser({ children }: { children: React.ReactNode }) {
    return (
        <div className="px-10 py-10">{children}</div>
    )
}

export default LayoutUser