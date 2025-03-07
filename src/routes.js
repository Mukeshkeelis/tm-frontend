import Dashboard from "./pages/dashboard";
import EmployeeManagement from "./pages/employeemanagement";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import EmployeeAction from "./pages/employeemanagement/components/index";
import Signin from "./pages/authentication/signin";
import TaskList from "./pages/tasklist/index";
// import HRManagement from "./pages/hrmanagement";
// import Permission from './pages/Permission/permission'
import RoleMaster from "./pages/rolemaster";
import RoleAction from "./pages/rolemaster/component/index"
import DepartmentMaster from "./pages/departmentmaster/index";
import DapartmentAction from "./pages/departmentmaster/component/index";
import  TaskAction  from "./pages/task/component/index";
import ProjectMaster from "./pages/projectMaster";
import ProjectAction from "./pages/projectMaster/component";
import Task from "./pages/task/index";

const routes =  [
    {
        name: "Authentication",
        key: "authentication",
        collapse: [
            {
                name: "Sign in",
                key: "sign-in",
                route: "/sign-in",
                component: <Signin />,
            },
        ]
    },
   
    {
        type: "collapse",
        icon: <HomeIcon />,
        name: "Dashboard",
        key: "dashboard",
        route: "/dashboard",
        component: <Dashboard />,
        noCollapse: true,
        protected: true,
        allowedRoles: ['Admin', 'Manager', 'Employee'],
    },
    {
        type: "collapse",
        icon: <HomeIcon />,
        name: "Masters",
        key: "masters",
        collapse : [
            {
                type:"collapse",
                icon:<PersonIcon  />,
                name:"Department Master",
                key:'department-master',
                route:'/department-master',
                component:<DepartmentMaster/>,
                noCollapse:true,
                protected:true,
                allowedRoles: ['Admin'],
            },
            {
                type:"collapse",
                icon:<PersonIcon  />,
                name:"Role Master",
                key:'role-master',
                route:'/role-master',
                component:<RoleMaster/>,
                noCollapse:true,
                protected:true,
                allowedRoles: ['Admin'],
            },
            {
                type: "collapse",
                icon: <PersonIcon />,
                name: "Employee Master",
                key: "employee-management",
                route: "/employee-management",
                component: <EmployeeManagement />,
                noCollapse: true,
                protected: true,
                allowedRoles: ['Admin'],
            },
            {
                type:"collapse",
                icon:<PersonIcon  />,
                name:"Project Master",
                key:'projectMaster',
                route:'/project-master',
                component:<ProjectMaster/>,
                noCollapse:true,
                protected:true,
                allowedRoles: ['Admin'],
            },
        ],
        allowedRoles: ['Admin'],
      
    },
    // {
    //     type:"collapse",
    //     icon:<PersonIcon />,
    //     name:"Admin",
    //     key:'admin',
    //     route:'/admin',
    //     component:<HRManagement/>,
    //     noCollapse:true,
    //     protected:true
    // },
    // {
    //     type:"collapse",
    //     icon:<PersonIcon />,
    //     name:"Permission",
    //     key:'Permission',
    //     route:'/Permission',
    //     component:<Permission/>,
    //     noCollapse:true,
    //     protected:true
    // },
    {
        type:'employee-management',
        icon:<PersonIcon  />,
        key:'employee-action',
        route:'/employee-management/employee-action',
        component:<EmployeeAction/>,
        noCollapse: true,
        protected:true,
        allowedRoles: ['Admin']
    },
    {
        type:'role-master',
        icon:<PersonIcon  />,
        key:'role-action',
        route:'/role-master/role-action',
        component:<RoleAction/>,
        noCollapse:true,
        protected:true,
        allowedRoles: ['Admin']
    },
    {
        type:'department-master',
        key:'department-action',
        route:'/department-master/department-action',
        component:<DapartmentAction/>,
        noCollapse:true,
        protected:true,
        allowedRoles: ['Admin']
    },
    {
        type:'project-action',
        name:"project-action",
        key:'projectMaster',
        route:'/project-master/project-action',
        component:<ProjectAction/>,
        noCollapse:true,
        protected:true,
        allowedRoles: ['Admin']
    },
    {
        type:'task-action',
        icon:<PersonIcon />,
        name:"Task Action",
        key:'task-action',
        route:'/task/task-action',
        component:<TaskAction/>,
        noCollapse:true,
        protected:true,
        allowedRoles: ['Admin', 'Manager']
    },
    {
        type:"collapse",
        icon:<PersonIcon />,
        name:"Task",
        key:'task',
        route:'/task',
        component:<Task/>,
        noCollapse:true,
        protected:true,
        allowedRoles: ['Admin',  'Manager'],
    },
    {
        type:"collapse",
        icon:<PersonIcon />,
        name:"Task List",
        key:'task-list',
        route:'/task-list',
        component:<TaskList/>,
        noCollapse:true,
        protected:true,
        allowedRoles: ['Manager', 'Employee'],
    },
]

export default routes;