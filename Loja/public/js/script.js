console.log("Script carregado com sucesso!");

async function removeProduct(id) {
  console.log("Função removeProduct chamada com id:", id);

  try {
    const response = await fetch(`/products/delete/${id}`, {
      method: 'DELETE'
    });

    const json = await response.json();

    if (json.success) {
      const modal = bootstrap.Modal.getInstance(document.getElementById('removeModal'));
      if (modal) {
        modal.hide();
      }
      window.location.href = "/products";
    } else {
      window.alert("Erro ao remover o produto.");
    }
  } catch (error) {
    window.alert("Erro ao remover o produto.");
  }
}

async function incrementItem(purchaseItemId) {
  try {
    const url = `/purchaseItem/increment/${purchaseItemId}`;
    
    const response = await fetch(url, {
      method: 'POST'
    });

    const json = await response.json();

    if (json.success) {
      window.location.reload();
    } else {
      console.error('Erro do servidor:', json.msg);
      window.alert("Erro ao incrementar quantidade: " + (json.msg || 'Erro desconhecido'));
    }
  } catch (error) {
    console.error('Erro ao incrementar:', error);
    window.alert("Erro ao incrementar quantidade.");
  }
}

async function decrementItem(purchaseItemId) {
  try {
    const url = `/purchaseItem/decrement/${purchaseItemId}`;
    
    const response = await fetch(url, {
      method: 'POST'
    });

    const json = await response.json();

    if (json.success) {
      window.location.reload();
    } else {
      console.error('Erro do servidor:', json.msg);
      window.alert("Erro ao decrementar quantidade: " + (json.msg || 'Erro desconhecido'));
    }
  } catch (error) {
    console.error('Erro ao decrementar:', error);
    window.alert("Erro ao decrementar quantidade.");
  }
}

async function removeItem(purchaseItemId) {
  if (!confirm('Deseja realmente remover este item do carrinho?')) {
    return;
  }

  try {
    const url = `/purchaseItem/remove/${purchaseItemId}`;
    
    const response = await fetch(url, {
      method: 'DELETE'
    });

    const json = await response.json();

    if (json.success) {
      window.location.reload();
    } else {
      console.error('Erro do servidor:', json.msg);
      window.alert("Erro ao remover item: " + (json.msg || 'Erro desconhecido'));
    }
  } catch (error) {
    console.error('Erro ao remover:', error);
    window.alert("Erro ao remover item do carrinho.");
  }
}
