import DashboardLayout from "@/modules/dashboard/layout";
import Categoria from "@/modules/categoria/page";
import Nivel from "@/modules/nivel/page";

export const routes = [
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            {
                path: "categoria", 
                element: <Categoria />  
            },
            {
                path: "nivel", 
                element: <Nivel />  
            }
        ]
    }
];