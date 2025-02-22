
import DashboardLayout from "@/modules/dashboard/layout";
import Categoria from "@/modules/categoria/page";
import Nivel from "@/modules/nivel/page";
import Recepcion from "@/modules/recepcion/page";

export const routes = [
    {
        path: "/",
       
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,  
        children: [
            {
                path: "categoria", 
                element: <Categoria />  
            },
            {
                path: "nivel", 
                element: <Nivel />  
            },
            {
                path: "recepcion",
                element: <Recepcion />
            }
        ]
    }
];