export default function AppLogo() {
    return (
        <>
                <img
                    src="/logo.svg"
                    alt="App Logo"
                    className="size-10"
                />
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    TaskManagement
                </span>
            </div>
        </>
    );
}
