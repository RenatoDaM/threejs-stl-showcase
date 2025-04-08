<template>
    <div class="product-page" v-if="product">
      <ModelViewer :modelPath="product.modelPath" />
      <ProductDescription
        :title="product.title"
        :description="product.description"
        :size="product.size"
        :material="product.material"
        :color="product.color"
        :onOrderClick="handleOrder"
      />
    </div>
    <div v-else class="product-not-found">
      <h2>Produto não encontrado</h2>
    </div>
    <button class="nav-button" @click="handleNext">Next</button>
  </template>
  
  <script>
  import { PRODUCT_MAP } from '../data/products';
  import ModelViewer from '../components/ModelViewer.vue';
  import ProductDescription from '../components/ProductDescription.vue';
  
  export default {
    name: 'MainModelView',
    props: {
      id: { type: String, required: true }
    },
    components: {
      ModelViewer,
      ProductDescription
    },
    computed: {
      product() {
        return PRODUCT_MAP[this.id] || null;
      }
    },
    methods: {
      handleOrder() {
        alert(`Pedido realizado para: ${this.product.title}`);
      },
      handleNext() {
        let nextId;
        do {
          const random = Math.floor(Math.random() * 3) + 1;
          nextId = `00${random}`;
        } while (nextId === this.id);
        this.$router.push(`/3d/${nextId}`);
      }
    }
  };
  </script>
  
  <style scoped>
  .product-page {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  .product-not-found {
    padding: 2rem;
    text-align: center;
  }
  .navigation-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}

.nav-button {
  background-color: #1e90ff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.nav-button:hover {
  background-color: #1c86ee;
  transform: translateY(-2px);
}

.nav-button:active {
  transform: translateY(0);
  background-color: #1874cd;
}
  </style>
  