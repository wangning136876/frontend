<template>
  <footer class="bg-dark text-white py-4 mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <h5><i class="bi bi-music-note-beamed me-2"></i>MusicStore</h5>
          <p class="text-muted">Your one-stop shop for musical instruments</p>
        </div>
        <div class="col-md-4">
          <h6>Quick Links</h6>
          <ul class="list-unstyled">
            <li><RouterLink to="/" class="text-muted text-decoration-none">Home</RouterLink></li>
            <li><RouterLink to="/products" class="text-muted text-decoration-none">Products</RouterLink></li>
            <li><RouterLink to="/cart" class="text-muted text-decoration-none">Cart</RouterLink></li>
          </ul>
        </div>
        <div class="col-md-4">
          <h6>Contact Us</h6>
          <p class="text-muted mb-1">
            <i class="bi bi-envelope me-2"></i>info@musicstore.com
          </p>
          <p class="text-muted">
            <i class="bi bi-telephone me-2"></i>+1 (555) 123-4567
          </p>
        </div>
      </div>
      <hr class="my-3">
      <div class="text-center text-muted">
        <small>&copy; 2026 MusicStore. All rights reserved.</small>
      </div>
    </div>
  </footer>
</template>
