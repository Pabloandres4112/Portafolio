let boxStider = document.getElementById("boxStider");

boxStider.addEventListener("click",function(){
    if(boxStider.classList.contains("box-slider-1")){
        boxStider.classList.remove("box-slider-1");
        boxStider.classList.add("box-slider-2");
    }
    else if(boxStider.classList.contains("box-slider-2")){
        boxStider.classList.remove("box-slider-2");
        boxStider.classList.add("box-slider-3");
    }
    else if(boxStider.classList.contains("box-slider-3")){
        boxStider.classList.remove("box-slider-3");
        boxStider.classList.add("box-slider-4");
    }
    else if(boxStider.classList.contains("box-slider-4")){
        boxStider.classList.remove("box-slider-4");
        boxStider.classList.add("box-slider-5");
    }
    else if(boxStider.classList.contains("box-slider-5")){
        boxStider.classList.remove("box-slider-5");
        boxStider.classList.add("box-slider-6");
    }
    else if(boxStider.classList.contains("box-slider-6")){
        boxStider.classList.remove("box-slider-6");
        boxStider.classList.add("box-slider-7");
    }
    else if(boxStider.classList.contains("box-slider-7")){
        boxStider.classList.remove("box-slider-7");
        boxStider.classList.add("box-slider-1");
    }
}) 