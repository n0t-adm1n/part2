import Part from "./Part";

const Content = ({parts}) => {
    // console.log(parts);
    return (
        <>
            {parts.map((p, i) => <Part  key={i} part={p}/>)}
            
            <b>total of {parts.reduce((sum,p)=> {
                return sum + p.exercises;
            }, 0)} exercises</b>
        </>
    )
}

export default Content;
