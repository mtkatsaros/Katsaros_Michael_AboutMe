export interface Project{
    _id: string,
    title: string,
    month: string,
    year: string,
    description: string,
    github: string,
}

//to be referenced when selecting a month 
export const projectMonths: Array<string> = 
    ['January', 'February', 'March', 
    'April', 'May', 'June', 'July', 
    'August', 'September', 'October',
    'November', 'December']