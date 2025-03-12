"use client"
import { usePathname } from 'next/navigation';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function Breadcrumbs() {
    const fullpath = usePathname();
    const pathnames = fullpath.split('/').filter((x) => x);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const formattedName = name.replace(/[-_]/g, ' ');
                    return (
                        <div className=' flex items-center gap-2' key={name}>
                            <BreadcrumbItem className="hidden md:block">

                                <BreadcrumbPage>
                                    {formattedName}
                                </BreadcrumbPage>

                            </BreadcrumbItem>
                            {index < pathnames.length - 1 && <BreadcrumbSeparator className="hidden md:block" />}
                        </div>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}