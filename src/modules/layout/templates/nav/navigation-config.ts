// types.ts - Navigation link types
export interface NavigationLink {
    label: string;
    href: string;
    testId?: string;
}

export interface CategoryLink extends NavigationLink {
    children?: NavigationLink[];
}


// navigation-config.ts - Navigation links configuration
export const navigationLinks: NavigationLink[] = [
    { label: "Home", href: "/", testId: "nav-home-link" },
    { label: "Store", href: "/store", testId: "nav-store-link" },
    { label: "About", href: "/about", testId: "nav-about-link" },
    { label: "Contact", href: "/contact", testId: "nav-contact-link" },
];

export const categoryLinks: NavigationLink[] = [
    { label: "Keyboards", href: "/category/keyboards" },
    { label: "Mice & Trackpads", href: "/category/mice" },
    { label: "Monitors & Displays", href: "/category/monitors" },
    { label: "Desk Accessories", href: "/category/accessories" },
    { label: "Audio & Headphones", href: "/category/audio" },
];