document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const imageInput = document.getElementById('image');
    const imagePreview = document.getElementById('imagePreview');
    const successMessage = document.getElementById('successMessage');
    
    // Image preview functionality
    imageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.addEventListener('load', function() {
                imagePreview.src = reader.result;
                imagePreview.classList.remove('d-none');
            });
            
            reader.readAsDataURL(file);
        } else {
            imagePreview.src = '#';
            imagePreview.classList.add('d-none');
        }
    });
    
    // Form validation and submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate form
        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        
        // Submit form via AJAX
        const formData = new FormData(form);
        
        fetch('process.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Show success message
            successMessage.classList.remove('d-none');
            form.reset();
            form.classList.remove('was-validated');
            imagePreview.src = '#';
            imagePreview.classList.add('d-none');
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.add('d-none');
            }, 5000);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Upload Successfull.');
        });
    });
    
    // Real-time validation for email format
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', function() {
        if (emailInput.validity.typeMismatch) {
            emailInput.setCustomValidity('Please enter a valid email address');
        } else {
            emailInput.setCustomValidity('');
        }
    });
});