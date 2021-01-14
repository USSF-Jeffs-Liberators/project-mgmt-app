export const links = {
    loggedOut: [
        {
            name: "Log In",
            href: "login",
            class: "loginLink"
        }, 
        {
            name: "Sign Up",
            href: "signup",
            class: "signupLink"
        }
    ],
    loggedIn: [
        {
            name: "Log Out",
            href: "logout",
            class: "logoutLink"
        }
    ],
    developer: [
        {
            name: "Project Dashboard",
            href: "",
            class: "dashboardLink"
        }
        //, {
        //     name: "Submit Issue",
        //     href: "issue",
        //     class: "issueLink"
        // }
    ],
    projectManager: [
        {
            name: "Project Dashboard",
            href: "",
            class: "dashboardLink"
        },
        {
            name: "View Finances",
            href: "finance",
            class: "financeLink"
        }
    ],
    generalManager: [
        {
            name: "Project Dashboard",
            href: "",
            class: "dashboardLink"
        },
        {
            name: "View Finances",
            href: "finance",
            class: "financeLink"
        },
        {
            name: "Create New Project",
            href: "create-project",
            class: "createProjectLink"
        }
    ]
}
