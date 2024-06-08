document.addEventListener("DOMContentLoaded", function() {
  
    // check for common mobile user agents
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
    
      var tooltipopen = document.querySelectorAll(".input__info-icon");
      var tooltipclose = document.querySelectorAll(".input__info-span>.link-button");
      var tooltip = document.querySelectorAll(".input__description-message");
  
      function tooltipOpen(event) {
          event.preventDefault();
          tooltip.forEach((item)=>{
            item.classList.remove("open-tooltip");
          });
          this.parentNode.classList.add("open-tooltip");
          this.parentNode.querySelector('.input__info-span').style.display="flex";
      }
  
      function tooltipClose(event) {
        event.preventDefault();
        this.parentNode.parentNode.classList.remove("open-tooltip");
        this.parentNode.style.display = "none";
      }
  
      tooltipopen.forEach((item)=>{
          item.addEventListener("click", tooltipOpen);
      });
  
      tooltipclose.forEach((item)=>{
        item.addEventListener("click", tooltipClose);
      });
  
    }
  
      
  
  });
  
  /*
   * Popup lightbox
   */ 
  // $(function () {
  //   $(".open").on("click", function(){
  //     $(".popup-overlay, .popup-content").addClass("active");
  //   });
  
  //   $(".close").on("click", function(){
  //     $(".popup-overlay, .popup-content").removeClass("active");
  //   });
  // });