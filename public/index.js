$(document).on("click",".delete", function () {
let deleteItem=$(this).parent()
let deleteIndex=deleteItem.find("textarea").attr("id")
console.log(deleteIndex)
$.ajax({
    success: function(data){
        console.log(data)
        deleteItem.fadeOut(500)
        setTimeout(()=>{getnote(data)
        },700)
        console.log("successfully submit data");


    },
    error: function(){
        console.log("You fuck up");
    },
    type: "delete",
    url: "/api/notes/"+deleteIndex,
   
})
});
$(document).on("click",".add-note",()=>{
    let newNote=$("#new-note").val();
    $.ajax({
        contentType: 'application/x-www-form-urlencoded',
    data: {
        "note": newNote
    },
    success: function(data){
        console.log(data)
        getnote(data)
        console.log("successfully submit data");
       
    },
    error: function(){
        console.log("You fuck up");
    },
        type: "post",
        url: "/api/notes/",
       
    })
   
    $("#new-note").val("")
   
})

$(document).on("change",".note-text", function (e) {
let changedIndex=$(this).parent().find("textarea").attr("id")
let changedText=$(this).val()
    $.ajax({
        contentType: 'application/x-www-form-urlencoded',
    data: {
        "note": changedText
    },
    success: function(data){
        getnote(data)
        console.log("successfully submit data");
       
    },
    error: function(){
        console.log("You fuck up");
    },
        type: "put",
        url: "/api/notes/"+changedIndex,
       
    })
   
});    


function getnote(data){  
        console.log(data)
        $(".note-list").empty()
       if(data.length!=0)
       {
        data.forEach((item,index) => {
            let noteTemplate=$(".note-template").clone()
            let noteContainer=noteTemplate.contents().find("textarea")
            noteContainer.attr("id", index);
            noteContainer.html(item)
            $(".note-list").append(noteTemplate.html())
            
        });
    }else{
        $(".note-list").append("<h1>You currently don't have any note</h1>")

    }
    
}
