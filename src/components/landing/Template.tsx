import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const templates = [
  {
    name: "Login Template",
    image: "https://res.cloudinary.com/dv0mgatgr/image/upload/v1736049208/Aldaui/y9nktghtlbui9yfzugai.png",
    path: "/login",
  },
  {
    name: "Dashboard Template",
    image: "https://res.cloudinary.com/dv0mgatgr/image/upload/v1736049433/Aldaui/lsivhqcrvrni6z07ynnu.png",
    path: "/dashboard",
  },
  {
    name: "Chart Template",
    image: "https://res.cloudinary.com/dv0mgatgr/image/upload/v1736139260/Aldaui/ezu505mtdwubrp9vp90l.png",
    path: "/chart",
  },
];

export function Template() {
  return (
    <section className="container space-y-8 py-12 lg:py-20 mx-auto" id="themes">
      <div className="mx-auto text-center md:max-w-[58rem]">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl text-text dark:text-text-dark">
          Templates
        </h2>
        <p className="leading-normal text-muted sm:text-lg sm:leading-7 mt-4 dark:text-muted">
          Beautiful templates to kickstart your next project
        </p>
      </div>

      <div className="mx-auto grid gap-8 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {templates.map((template) => (
          <div
            key={template.name}
            className="relative overflow-hidden rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-black transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:border-primary dark:hover:border-primary-hover"
          >
            <img
              src={template.image}
              alt={`${template.name} preview`}
              width={400}
              height={300}
              className="object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-text dark:text-text-dark">{template.name}</h3>
              <Link
                to={template.path}
                className="text-primary hover:text-primary-hover hover:underline mt-2 inline-flex items-center"
              >
                Visit Template
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 5l7 7-7 7M5 12h14"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button
          size="lg"
          className="bg-primary hover:bg-primary-hover text-white"
        >
          View All Templates
        </Button>
      </div>
    </section>
  );
}
