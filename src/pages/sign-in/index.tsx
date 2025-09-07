import { useNavigate } from 'react-router';
import { supabase } from '../../lib/supabase';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '../../components/ui';
import { toast } from "sonner";

const formSchema = z.object({
    email: z.email({
        error: "올바른 형식의 이메일 주소를 입력해주세요.",
    }),
    password: z.string().min(8, {
        error: "비밀번호는 최소 8자 이상이어야 합니다.",
    }),
});

const SignIn = () => {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSignIn = async (values: z.infer<typeof formSchema>) => {
        console.log('로그인 버튼 클릭');

        try {
            const {
                data: { user, session },
                error,
            } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            if(user && session) {
                console.log(user);
                console.log(session);
                toast.success("로그인을 성공하였습니다.");
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            throw new Error(`${error}`);
        }
    }
    return (
        <main className="w-full h-full min-h-[720px] flex items-center justify-center p-6 gap-6">
            <div className="w-100 max-w-100 flex flex-col px-6 gap-6">
                <div className="flex flex-col">
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center mb-3">관리자 로그인</h4>
                    <p className="text-muted-foreground">관리자 로그인을 위한 정보를 입력해주세요.</p>
                </div>
                <div className="grid gap-3">
                    {/* 로그인 폼 */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSignIn)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>관리자명</FormLabel>
                                        <FormControl>
                                            <Input placeholder="관리자명을 작성하세요." {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>비밀번호</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="비밀번호를 입력하세요." {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <div className="w-full flex flex-col gap-3">
                                <Button type="submit" variant={"outline"} className="flex-1 !bg-sky-800/50">
                                    로그인
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </main>
    );
};

export default SignIn;