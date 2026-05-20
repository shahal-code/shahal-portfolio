import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Set noindex for 404 pages - prevents Google from wasting crawl budget
    document.title = "404 - Page Not Found | Muhammed Shahal Portfolio";

    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      (robotsMeta as HTMLMetaElement).name = "robots";
      document.head.appendChild(robotsMeta);
    }
    const previousRobots = robotsMeta.getAttribute("content");
    robotsMeta.setAttribute("content", "noindex, nofollow");

    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Restore on unmount
    return () => {
      document.title =
        "Muhammed Shahal | Freelance MERN Stack & Full Stack Developer in Kerala, India";
      if (robotsMeta && previousRobots) {
        robotsMeta.setAttribute("content", previousRobots);
      } else if (robotsMeta) {
        robotsMeta.setAttribute("content", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
      }
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <div className="text-8xl font-black text-primary opacity-20 select-none">404</div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Page Not Found
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          The page you're looking for doesn't exist. Let's get you back to{" "}
          <span className="text-primary font-semibold">Muhammed Shahal's</span> portfolio.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="rounded-full px-8 h-12 text-base font-semibold"
        >
          Back to Portfolio
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
