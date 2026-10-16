const productVariants = {
  100: {
    weight: "100 г",
    article: "01306",
    currentPrice: 326.4,
    oldPrice: 349.2,
  },

  500: {
    weight: "500 г",
    article: "01307",
    currentPrice: 1432,
    oldPrice: 1646,
  },

  1000: {
    weight: "1000 г",
    article: "01308",
    currentPrice: 2064,
    oldPrice: 2592,
  },

  5000: {
    weight: "5000 г",
    article: "01309",
    currentPrice: 6320,
    oldPrice: 8710,
  },
};

class ProductDetails {
  selectors = {
    root: "[data-js-product-details]",
    option: "[data-js-product-details-option]",
    productArticle: "[data-js-product-details-article]",
    currentPrice: "[data-js-product-details-current-price]",
    oldPrice: "[data-js-product-details-old-price]",
    cartButton: "[data-js-product-details-cart-button]",
    cartFeedback: "[data-js-product-details-cart-feedback]",
    favoriteButton: "[data-js-product-details-favorite-button]",
  };

  stateClasses = {
    selected: "product-packaging__option--selected",
    isActive: "is-active",
  };

  stateAttributes = {
    dataVariant: "data-variant",
    ariaPressed: "aria-pressed",
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.optionElements = this.rootElement.querySelectorAll(
      this.selectors.option,
    );
    this.productArticleElements = this.rootElement.querySelectorAll(
      this.selectors.productArticle,
    );
    this.currentPriceElement = this.rootElement.querySelector(
      this.selectors.currentPrice,
    );
    this.oldPriceElement = this.rootElement.querySelector(
      this.selectors.oldPrice,
    );
    this.cartButtonElement = this.rootElement.querySelector(
      this.selectors.cartButton,
    );
    this.cartFeedbackElement = this.rootElement.querySelector(
      this.selectors.cartFeedback,
    );
    this.favoriteButtonElement = this.rootElement.querySelector(
      this.selectors.favoriteButton,
    );
    this.selectedVariantId = 100;
    this.bindEvents();
    this.selectProductVariant(this.selectedVariantId);
  }

  formatPrice(price) {
    return `${price.toFixed(2)} ₽`;
  }

  selectProductVariant = (variantId) => {
    const selectedVariant = productVariants[variantId];

    if (!selectedVariant) {
      return;
    }

    this.selectedVariantId = variantId;

    this.currentPriceElement.textContent = this.formatPrice(
      selectedVariant.currentPrice,
    );

    this.oldPriceElement.textContent = this.formatPrice(
      selectedVariant.oldPrice,
    );

    this.productArticleElements.forEach((element) => {
      element.textContent = selectedVariant.article;
    });

    this.optionElements.forEach((option) => {
      const isSelected =
        option.getAttribute(this.stateAttributes.dataVariant) ===
        String(variantId);

      option.classList.toggle(this.stateClasses.selected, isSelected);

      option.setAttribute(this.stateAttributes.ariaPressed, String(isSelected));
    });

    this.cartFeedbackElement.hidden = true;
    this.cartFeedbackElement.textContent = "";
  };

  onOptionElementClick = ({ target }) => {
    const optionElement = target.closest(this.selectors.option);

    if (!optionElement) {
      return;
    }

    this.selectProductVariant(
      optionElement.getAttribute(this.stateAttributes.dataVariant),
    );
  };

  onCartButtonClick = () => {
    const selectedVariant = productVariants[this.selectedVariantId];

    if (!selectedVariant) {
      return;
    }

    this.cartFeedbackElement.textContent = `Выбрана фасовка ${selectedVariant.weight}, артикул ${selectedVariant.article}.`;
    this.cartFeedbackElement.hidden = false;
  };

  onfavoriteButtonClick = () => {
    this.favoriteButtonElement.classList.toggle(this.stateClasses.isActive);
  };

  bindEvents() {
    this.rootElement.addEventListener("click", this.onOptionElementClick);
    this.cartButtonElement.addEventListener("click", this.onCartButtonClick);
    this.favoriteButtonElement.addEventListener(
      "click",
      this.onfavoriteButtonClick,
    );
  }
}

class ProductGallery {
  selectors = {
    root: "[data-js-product-gallery]",
    imageButton: "[data-js-product-gallery-image-button]",
    productImage: "[data-js-product-gallery-product-image]",
    dialog: "[data-js-product-gallery-dialog]",
    dialogImage: "[data-js-product-gallery-dialog-image]",
    dialogCloseButton: "[data-js-product-gallery-dialog-close-button]",
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.imageButtonElement = this.rootElement.querySelector(
      this.selectors.imageButton,
    );
    this.productImageElement = this.rootElement.querySelector(
      this.selectors.productImage,
    );
    this.dialogElement = this.rootElement.querySelector(this.selectors.dialog);
    this.dialogImageElement = this.rootElement.querySelector(
      this.selectors.dialogImage,
    );
    this.dialogCloseButtonElement = this.rootElement.querySelector(
      this.selectors.dialogCloseButton,
    );
    this.bindEvents();
  }

  onImageButtonClick = () => {
    this.dialogImageElement.src = this.productImageElement.src;
    this.dialogImageElement.alt = this.productImageElement.alt;

    this.dialogElement.showModal();
  };

  onDialogCloseButtonClick = () => {
    this.dialogElement.close();
  };

  onDialogClick = ({ target }) => {
    if (target === this.dialogElement) {
      this.dialogElement.close();
    }
  };

  bindEvents() {
    this.imageButtonElement.addEventListener("click", this.onImageButtonClick);
    this.dialogCloseButtonElement.addEventListener(
      "click",
      this.onDialogCloseButtonClick,
    );
    this.dialogElement.addEventListener("click", this.onDialogClick);
  }
}

new ProductDetails();
new ProductGallery();
