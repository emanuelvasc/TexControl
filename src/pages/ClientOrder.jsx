import { supabase } from "../lib/supabase";

// Dentro de ClientOrder, substitua o handleSubmit:
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  const orderNumber = "#" + Math.floor(Math.random() * 9000 + 1000);
  
  const newOrder = {
    order_number: orderNumber,
    client_name: userData?.name || "Cliente",
    client_email: userData?.email,
    product: order.product,
    quantity: parseInt(order.quantity),
    color: order.color,
    size: order.size,
    details: order.details,
    deadline: order.deadline,
    status: "Aguardando aprovação",
  };
  
  try {
    // Salvar no Supabase
    const { error } = await supabase
      .from('orders')
      .insert([newOrder]);

    if (error) {
      console.error("Erro ao salvar pedido:", error);
      alert("Erro ao enviar pedido. Tente novamente.");
    } else {
      // Salvar também no localStorage para compatibilidade
      const existingOrders = JSON.parse(localStorage.getItem("client_orders") || "[]");
      existingOrders.push({
        ...newOrder,
        id: orderNumber,
        date: new Date().toLocaleDateString(),
      });
      localStorage.setItem("client_orders", JSON.stringify(existingOrders));
      
      setSubmitted(true);
      setOrder({ product: "", quantity: "", color: "", size: "", details: "", deadline: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao conectar. Tente novamente.");
  }
  
  setIsLoading(false);
};