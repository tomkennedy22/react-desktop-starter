import { Image } from "@heroui/react";
import { createFileRoute, Link } from "@tanstack/react-router";

const sourceLinks = [
    { name: "Electron-Vite", imageSrc: "https://electron-vite.org/logo.svg", href: "https://electron-vite.org/" },
]

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    return (
        <div className="p-2">
            <div className="flex gap-4">
                {sourceLinks.map((link) => (
                    <Link
                        key={`link-${link.name}`}
                        to={link.href}
                    >
                        <Image
                            key={`img-${link.name}`}
                            className="w-24 h-24" src={link.imageSrc} /></Link>
                ))}
            </div>

            <div>Powered by electron-vite</div>
            <div className="text-red-600">
                Build an Electron app with <span className="react">React</span>
                &nbsp;and <span className="ts">TypeScript</span>
            </div>
            <p>
                Please try pressing <code>F12</code> to open the devTool
            </p>
        </div>
    );
}
