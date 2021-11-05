const Container = props => {
    return(
        <>
            <props.content {...props} />
        </>
    )
}
export default Container