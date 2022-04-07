import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Search } from "../../services/media.service"
import './media.css'
export default function MediaComponent() {
    const [data, setData] = useState([]);
    const [type, setType] = useState("");
    const [page,setPage]=useState(1);
    const [keywords, setKeywords] = useState("");
    const [totalPages,setTotalPages]=useState(0);
    useEffect(()=>{
        updateResult();
    },[type,keywords,page]);
    const updateResult = function () {
        Search(type, keywords,page)
            .then((result) => {
                setTotalPages(result.data.pages);
                setData(result.data.data);
            })
            .catch((err) => {
                debugger;
            })
    }
    
    return (
        <div className="container">
            <Link className="btn btn-success" to="/add">Add URLs</Link>
            <hr/>
            <div className="filters row">
                <div className="quick-filters col-6">
                    <input 
                    type="button" 
                    className={`btn btn-primary col-4 ${type==''?'active':''}`} 
                    value="All"
                    onClick={()=>
                    {
                        setPage(1);
                        setType('')
                        updateResult();
                    }}></input>

                    <input 
                    type="button" 
                    className={`btn btn-primary col-4 ${type=='image'?'active':''}`} 
                    value="Image"
                    onClick={()=>
                    {
                        setPage(1);
                        setType('image')
                        updateResult();
                    }}></input>

                    <input 
                    type="button" 
                    className={`btn btn-primary col-4 ${type=='video'?'active':''}`} 
                    value="Video"
                    onClick={()=>{
                        setPage(1);
                        setType('video')
                        updateResult();
                    }}></input>
                </div>
                <div className="search col-6">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Keywords..." 
                    value={keywords} 
                    onChange={e=>{
                        setPage(1);
                        setKeywords(e.target.value)
                    }}/>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">URL</th>
                        <th scope="col">Location</th>
                        <th scope="col">Type</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <TableContent data={data}></TableContent>
                <Pagination page={page} totalPages={totalPages} handlePage={(pressedPage)=>{
                    setPage(pressedPage);
                }}></Pagination>
            </table>
        </div>
    )
}
function Pagination(props){
    const page = props.page;
    const totalPages = props.totalPages;
    const canNext =page<totalPages;
    const canPrev = page>1;
    const pages=[];
    for(var i =1;i<=totalPages;i++){
        pages.push(<button className={`page`} disabled={page==i} value={i} onClick={(e)=>props.handlePage(e.target.value)}>{i}</button>)
    }
    
    return(
        <div className="pagination">
            <button className="previous" disabled={!canPrev} onClick={()=>{
                props.handlePage(page-1)
            }}>{'<<'}</button>
            {pages}
            <button className="next" disabled={!canNext} onClick={()=>{
                props.handlePage(page+1)
            }}>{'>>'}</button>
        </div>
    )
}
function TableContent(props) {
    return (
        <tbody>
            {
                props.data.map(entry => {
                    return (
                        <tr>
                            <td>
                                <a href={entry.URL} target="_blank">
                                    {entry.MediaType.toLowerCase()=='image'?
                                    (<img src={entry.URL}></img>):
                                    entry.URL}
                                </a>
                            </td>
                            <td>
                                <a href={entry.ParentURL} target="_blank">{entry.ParentURL}</a>
                            </td>
                            <td>{entry.MediaType}</td>
                            <td>{entry.Description}</td>
                        </tr>
                    )
                })
            }
        </tbody>
    )
}