$(".delete-note").on("click", function () {
let deleteIndex=$(this).parent().find("textarea").attr("id")
$.ajax({
    type: "delete",
    url: "/api/notes/"+deleteIndex,
   
});
});
$(".add-note").on("click",()=>{
    
    
})

$.get("/api/notes/",
function (data) {
    console.log(data)
})
