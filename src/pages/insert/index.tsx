import { useState, useEffect } from 'react'
import { ChevronLeftIcon } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor'
import '../../styles/scss/Post.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { checkLogin, InsertSubmit, ModifyPost } from '../../store/hook'
import { Button } from '../../components/ui'

interface PostData {
    id: number;
    category: string;
    tags: string[];
    title: string;
    content: string;
}

function CreatePost() {
    const navigate = useNavigate();
    const location = useLocation() as { state: { postData: PostData}};
    const [ id, setPostid ] = useState<number | null>(null);
    const [ category, setCategory ] = useState<string>("html");
    const [ tags, setTags ] = useState<string[]>([]);
    const [ title, setTitle ] = useState<string>("");
    const [ content, setContent ] = useState<string>("");

    function modifyData() {
        const {postData} = location.state;
        setPostid(postData.id);
        setCategory(postData.category);
        setTags(postData.tags);
        setTitle(postData.title);
        setContent(postData.content);
    }

    useEffect(() => {
        checkLogin();
        if(location.state) {
            modifyData();
        } else {
            console.log(`${location.state} location state null`);
        }
    }, [location.state])

    async function postSubmit(e) {
        e.preventDefault();
        if(!category || !title || !content || tags.length === 0) {
            return console.log('category or title or content text null');
        }
        await InsertSubmit({category, title, content}, 'post');
        navigate('/entvy_blog_admin/posts');
    }
    async function modify(e) {
        e.preventDefault();
        if(category === '' || title === '' || content === '') {
            return console.log('category or title or content text null');
        }
        await ModifyPost({category, title, content, id}, 'post');
        navigate('/entvy_blog_admin/posts');
    }

    return (
        <div className="post_wrap">
            <Form.Select aria-label="Default select example" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="js">JavaScript</option>
                <option value="react">React</option>
                <option value="figma">Figma</option>
            </Form.Select>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                    Title
                </InputGroup.Text>
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </InputGroup>
            <MDEditor 
                value={content}
                onChange={setContent}
                preview="edit"
                textareaProps={{
                    placeholder: 'Plase enter markdown text'
                }}
            />
            <div className="post_btn">
                { location.state ? 
                    <Button type="submit" variant="destructive" onClick={modify}>수정하기</Button>
                 :
                    <Button type="submit" variant="outline" onClick={postSubmit}>보내기</Button>
                }
                <Button variant="secondary" size="icon" className="size-8" onClick={() => navigate(-1)}>
                    <ChevronLeftIcon />
                </Button>
            </div>
        </div>
    );
}

export default CreatePost;