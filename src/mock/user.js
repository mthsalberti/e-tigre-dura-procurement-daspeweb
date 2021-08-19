import profile from "@/mock/profile";
import department from "@/mock/department";

export default [
    [],
    {
        id: 1,
        authed: true,
        name: 'Matheus',
        profile_id: 1,
        profile: profile[1],
        department_id: 1,
        department: department[1],
    },
    {
        id: 2,
        authed: true,
        name: 'Marcos',
        profile_id: 2,
        profile: profile[2],
        department_id: 2,
        department: department[2],
    },
    {
        id: 3,
        authed: false,
        name: 'Ana',
        profile_id: 2,
        profile: profile[2],
        department_id: 1,
        department: department[1],
    },
    {
        id: 3,
        authed: false,
        name: 'Guilherme',
        profile_id: 1,
        profile: profile[1],
        department_id: 2,
        department: department[2],
    },
    {
        id: 4,
        authed: true,
        name: 'Vitor',
        profile_id: 2,
        profile: profile[2],
        department_id: 3,
        department: department[3],
    },
]