const CourseCategoryItem=(props)=>{
    return (
        <div className="courseCategoryItem col-lg-3 p-4">
            <div className="card  p-3 border-0 justify-content-center align-items-center rounded-4">
                <div className="icon d-flex justify-content-center align-items-center w-auto rounded-2" style={{backgroundColor:props.iconBgColor}}>
                    <i className={`bi bi-${props.iconName} w-auto fs-4 `} style={{color:props.iconColor}}></i>
                </div>
                <h5 className="m-0 p-0 mt-3">{props.name}</h5>
                <p className="m-0 p-0 mt-4 mb-2 text-center">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam earum autem doloremque ducimus 
                </p>
            </div>
        </div>
    )
}

export default CourseCategoryItem;