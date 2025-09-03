const AppFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t bg-background/95 py-6 shadow-sm">
            <div className="container m-auto flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-sm text-muted-foreground text-center md:text-left">
                    &copy; {currentYear} Entvy-News. All rights reserved.
                </p>
                <nav className="flex space-x-4">
                    <a href="/" className="text-sm text-muted-foreground hover:text-primary">
                        개인정보처리방침
                    </a>
                    <a href="/" className="text-sm text-muted-foreground hover:text-primary">
                        이용약관
                    </a>
                </nav>
            </div>
        </footer>
    );
}

export { AppFooter }