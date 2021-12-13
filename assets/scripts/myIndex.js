 new ClipboardJS('#copy-btn');
 $('.note').draggabilly()

 $.ajaxSettings.async = false;
 var comm_list;
 var todo_list = [];
 let token = localStorage.getItem("token");

 if (token != null && token != "undefined") {
   // 去掉的disabled
   document.getElementById("noteTextArea").removeAttribute("disabled")
 } else {
   console.log("不存在token")
 }

 function stopPropagation(e) {
   e = e || window.event;
   if (e.stopPropagation) { //W3C阻止冒泡方法
     e.stopPropagation();
   } else {
     e.cancelBubble = true; //IE阻止冒泡方法
   }
 }

 function debounce(fn, delay) {
   let delays = delay || 500;
   let timer;
   return function() {
     let th = this;
     let args = arguments;
     if (timer) {
       clearTimeout(timer);
     }
     timer = setTimeout(function() {
       timer = null;
       fn.apply(th, args);
     }, delays);
   };
 }

 function showAlert(title, description) {
   GrowlNotification.notify({
     title: title,
     description: description,
     type: 'success',
     position: 'top-right',
     showProgress: true,
     closeTimeout: 2500
   });
 }

 function showDelDialog(title, description, id) {
   GrowlNotification.notify({
     title: title,
     description: description,
     type: 'alert',
     position: 'top-right',
     closeTimeout: 0,
     showButtons: true,
     buttons: {
       action: {
         text: '确认',
         callback: function delFunction() {
           if (token != null && token != "undefined") {
            delItem(id)
           } else {
             showAlert("非法操作", "token为空")
           }
         }
       },
       cancel: {
         text: '取消',
       }
     },
   });
 }


//  $(document).ready(function() {
//    getNote();
//    // 监听值改变, 防抖
//    $('#noteTextArea').on('input propertychange', debounce(function() {
//      // 给后端加备忘录
//      saveNote()
//    }));
//  })
