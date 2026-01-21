import Part from "./Part";

const Content = ({parts}) => {
    console.log(parts);
    return (
        <>
            {parts.map((p, i) => <Part  key={i} part={p}/>)}
        </>
    )
}

export default Content;
