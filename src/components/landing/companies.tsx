export function Companies() {
    return (
        <section className="container space-y-8 py-12 lg:py-20 mx-auto">
            <div className="mx-auto text-center md:max-w-[58rem]">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl text-text dark:text-text-dark">
                    Trusted by Companies Worldwide
                </h2>
                <div className="mt-8 flex flex-wrap justify-center items-center gap-8 opacity-75">
                    <div className="h-12 w-32 rounded-lg bg-surface dark:bg-surface-dark border border-border dark:border-border-dark" />
                    <div className="h-12 w-32 rounded-lg bg-muted/10 dark:bg-muted/20 border border-border dark:border-border-dark" />
                    <div className="h-12 w-32 rounded-lg bg-primary/20 dark:bg-primary/30 border border-primary dark:border-primary-hover" />
                    <div className="h-12 w-32 rounded-lg bg-primary dark:bg-primary-hover border border-primary dark:border-primary-hover" />
                </div>
            </div>
        </section>
    );
}
