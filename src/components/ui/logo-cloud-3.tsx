import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type Logo = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
    logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
    return (
        <div
            {...props}
            className={cn(
                "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
                className
            )}
        >
            <InfiniteSlider gap={42} reverse duration={80} durationOnHover={25}>
                {logos.map((logo) => (
                    <img
                        alt={logo.alt}
                        className="pointer-events-none h-10 md:h-14 w-auto max-w-[200px] px-2 object-contain select-none dark:brightness-0 dark:invert transition-all"
                        height={logo.height || 60}
                        key={`logo-${logo.alt}`}
                        loading="lazy"
                        src={logo.src}
                    />
                ))}
            </InfiniteSlider>
        </div>
    );
}
