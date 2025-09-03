import { useEffect, useState } from "react";
import { Button } from "../ui";
import { useNavigate } from "react-router";

const AppHeader = () => {
    const navigate = useNavigate();
    const [ administrator, setAdministrator ] = useState<string>('관리자');

    useEffect(() => {

    })
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between">
                {/* 로고 */}
                <div>
                    <a href="/" className="flex items-center space-x-2 font-semibold text-lg md:text-sm cursor-pointer">
                        Entvy-Admin
                    </a>
                </div>
                <div>
                    <span className="md:text-sm">{administrator}</span>
                    { !administrator ? 
                        ( <Button variant="destructive">로그아웃</Button> ) : 
                        ( <Button variant="outline" onClick={() => navigate('/login')}>로그인</Button> )
                    }
                </div>
            </div>
        </header>
    );
}

export { AppHeader }