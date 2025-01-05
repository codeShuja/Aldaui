import { BlocksIcon, PaintbrushIcon, SmartphoneIcon, SparklesIcon, SplitIcon, Wand2Icon } from "../icons/icon";

const features = [
  {
    icon: <BlocksIcon className="h-10 w-10 text-primary" />,
    title: "Rich Components",
    description:
      "A comprehensive collection of pre-built components ready for your next project.",
  },
  {
    icon: <SmartphoneIcon className="h-10 w-10 text-primary" />,
    title: "Responsive Design",
    description:
      "Fully responsive components that adapt seamlessly to any screen size.",
  },
  {
    icon: <PaintbrushIcon className="h-10 w-10 text-primary" />,
    title: "Customizable",
    description:
      "Easily customize the look and feel to match your brand identity.",
  },
  {
    icon: <SplitIcon className="h-10 w-10 text-primary" />,
    title: "Modular Architecture",
    description:
      "Import only what you need, keeping your application lightweight.",
  },
  {
    icon: <SparklesIcon className="h-10 w-10 text-primary" />,
    title: "Modern Development",
    description:
      "Built with the latest web technologies and best practices in mind.",
  },
  {
    icon: <Wand2Icon className="h-10 w-10 text-primary" />,
    title: "Developer Experience",
    description:
      "Excellent developer experience with detailed documentation and examples.",
  },
];

export function Features() {
  return (
    <section className="container space-y-8 py-12 lg:py-20 mx-auto" id="features">
      <div className="text-center mx-auto md:max-w-[58rem]">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl text-text dark:text-text-dark">
          Features
        </h2>
        <p className="leading-normal text-muted sm:text-lg sm:leading-7 mt-4 dark:text-muted">
          Everything you need to build modern user interfaces
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mx-auto">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="relative overflow-hidden rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-6 hover:bg-muted/10 dark:hover:bg-muted/20 transition-all duration-200 ease-in-out shadow-lg dark:shadow-none"
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2 text-center">
                <div className="text-primary dark:text-primary">{feature.icon}</div>
                <h3 className="font-bold text-text dark:text-text-dark">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted dark:text-muted">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
