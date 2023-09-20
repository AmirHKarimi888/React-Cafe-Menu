export const AdminModal = (props) => {

    return (
        <div className="adminModal" onClick={props.toggleAdminModal}>
            <div id="adminModal" className="backdrop fixed w-full h-screen backdrop-blur-sm"></div>
        </div>
    )
}