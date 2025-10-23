   function initMenu() {
       const cards = document.querySelectorAll('.menu-card');
       
       // Animación de entrada escalonada
       cards.forEach((card, index) => {
           card.style.opacity = '0';
           card.style.transform = 'translateY(50px)';
           
           setTimeout(() => {
               card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
               card.style.opacity = '1';
               card.style.transform = 'translateY(0)';
           }, index * 150);
       });

       // Efecto de clic visual
       cards.forEach(card => {
           card.addEventListener('mousedown', function() {
               this.style.transform = 'scale(0.98)';
           });
           
           card.addEventListener('mouseup', function() {
               this.style.transform = 'scale(1)';
           });
           
           card.addEventListener('mouseleave', function() {
               this.style.transform = 'scale(1)';
           });
       });

       // Efecto parallax
       const wrapper = document.querySelector('.cards-wrapper');
       wrapper.addEventListener('mousemove', function(e) {
           const rect = wrapper.getBoundingClientRect();
           const x = (e.clientX - rect.left) / rect.width;
           const y = (e.clientY - rect.top) / rect.height;
           
           cards.forEach((card, index) => {
               const background = card.querySelector('.card-background');
               if (background) {
                   const offsetX = (x - 0.5) * 15;
                   const offsetY = (y - 0.5) * 15;
                   
                   const currentTransform = card.matches(':hover') ? 'scale(1.1)' : 'scale(1)';
                   background.style.transform = `translate(${offsetX * (index % 2 === 0 ? 1 : -1)}px, ${offsetY}px) ${currentTransform}`;
               }
           });
       });
   }

   // Ejecutar en carga inicial y en navegación
   document.addEventListener('DOMContentLoaded', initMenu);
   window.addEventListener('popstate', initMenu); // Para navegación "atrás/adelante"
   