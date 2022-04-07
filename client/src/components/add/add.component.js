import { useEffect, useState } from "react"
import SubmitURLs from "../../services/scrap.service";

export default function AddComponent() {
    const [count, setCount] = useState(1);

    return (
        <div>
            <h4>Add Urls to be scrapped</h4>
            {<GenerateItems count={count}></GenerateItems>}
            <button className="btn" onClick={()=>{
                setCount(count+1);
            }}>Add More</button>
            <button className="btn btn-success" onClick={()=>{
                const elements = document.getElementsByName('url[]');
                if(elements!=undefined && elements.length>0){
                    debugger;
                    var urls = Array.from(elements).map(entry=>{
                        return entry.value
                    });
                    SubmitURLs(urls)
                    .then((response)=>{
                        alert(response.data)
                        window.location.replace('/media');
                    })
                    .catch((err)=>{
                        alert(err.message);
                    })
                }
            }}>Submit</button>
        </div>
    )
}
function GenerateItems(props) {
    const items = [];
    for (var i = 0; i < props.count; i++) {
        items.push(
            <div className="row">
                <input name="url[]" className="form-contro" placeholder="Address to scrap"></input>
            </div>
        )
    }

    return (
        <div className="container">
            {items}
        </div>
    )
}