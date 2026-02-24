// Dependency-free classname merger to bypass NPM EPERM blocks
export function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ");
}
