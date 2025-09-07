import { supabase } from "../lib/supabase";

// github 계정 연동 로그인
export async function signInWithGithub(): Promise<void> {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
        redirectTo: "http://localhost:5173/entvy_blog_vite/admin/page",
        },
    });
    if(error) {
        console.error('SignInWithGithub error', error, data);
    } else {
        console.log('Sign In success');
    }
}

// github 계정 상태체크
export async function checkLogin(): Promise<void> {
    const authInfo = await supabase.auth.getSession();
    const session = authInfo.data.session;
    if(session === null) {
        console.log('logout success');
    } else {
        console.log('login');
    }
}

// github 계정 연동 로그아웃
export async function signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if(error) {
        console.error('LogOut Error', error);
    } else {
        checkLogin();
    }
}

//  supabase DB Get
export async function getData<T>(
    setData: React.Dispatch<React.SetStateAction<T[]>>,
    dbTable: string,
    columnName?: string,
    value?: string | number
): Promise<void> {
    let query = supabase.from(dbTable).select();

    if(columnName && value !== undefined) {
        query = query.eq(columnName, value);
    }

    const { data, error } = await query;

    if(error) {
        console.error('SELECT Error', error);
    } else {
        setData(data);
    }
}

// supabase DB Insert
export async function InsertSubmit<T extends Record<string, any>>(
    insertData: T,
    dbTable: string
): Promise<void> {
    const { data, error } = await supabase.from(dbTable).insert([insertData]);
    
    if(error) {
        console.error('INSERT Error', error, data);
    } else {
        console.log('Insert Success' , data);
    }
}

//  supabase DB Delete
export async function deletePost(
    id: number | string,
    dbTable: string
): Promise<void> {
    const { data, error } = await supabase.from(dbTable).delete().eq("id", id);

    if(error) {
        console.error('Delete Error', error, data)
    } else {
        console.log('Delete success');
        window.location.reload();
    }
}

// 날짜 시간 필더링 (2025-08-04 오후 2:14:00)
export function DateFilter(date: string | number | Date): string {
    const dateObj = new Date(date);

    return ( 
        dateObj.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }) + " " + 
        dateObj.toLocaleTimeString('ko-KR', {
            hour: "numeric", 
            minute: "numeric", 
            second: "numeric"
        })
    );
}