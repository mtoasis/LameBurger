$(document).ready(function () {
reload()

var list =[];

    $(document).on("click", "#submitBtn", function () {
        var NewBurger = {
            text: $("#inputBox").val(),
            complete: false
        };

        $.post("/api/all", NewBurger, reload)
    })

    function reload(){
        $("#listDiv").empty();
        $("#resultDiv").empty();

        $.get("/api/all/false",function(data){
            list = data;

            for (var i=0, n=list.length; i<n; i++){
                var div = '<div id="'+list[i].id+'" class="listbox" data="'+list[i].text+'">'
                var Box = '<button class="lists">'+(i+1)+'. '+list[i].text+'</button>';
                var rmBtn = '<button class="rm">EAT</button>'
                div = div+Box+rmBtn;
                $("#listDiv").append(div)
            }

        })

        $.get("/api/all/true",function(data){
            list = data;
            for (var i=0, n=list.length; i<n; i++){
                var div = '<div id="'+list[i].id+'" class="listbox" data="'+list[i].text+'">'
                var Box = '<button class="lists" disabled>'+(i+1)+'. '+list[i].text+'</button>';
                var xBtn = '<button class="xbtn">X</button>'
                div = div+Box+xBtn;
                $("#resultDiv").append(div)
            }

        })

        
    }
    
    $(document).on("click", ".rm", function(){
        var id = $(this).parent().attr("id")
        var text = $(this).parent().attr("data")


        var updated = {
            text:text,
            id:id,
            complete:true
        }

            $.ajax({
              method: "PUT",
              url: "/api/all",
              data: updated
            }).then(reload);
          
    })

    $(document).on("click",".xbtn", function(){
        var id = $(this).parent().attr("id")
        var target = {
            id:id
        }

            $.ajax({
              method: "DELETE",
              url: "/api/all",
              data: target
            }).then(reload);
          
    })


})
