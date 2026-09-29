type DeliveryItem = { title: string; detail: string; format: string; status: string };
type DeliveryGroup = { title: string; items: DeliveryItem[] };

export function ProductDeliverables({ groups }: { groups: DeliveryGroup[] }) {
  return <div className="product-deliverables">
    {groups.map(group => <div className="product-delivery-group" key={group.title}>
      {groups.length > 1 && <p className="product-delivery-group-title">{group.title}</p>}
      <ul>{group.items.map(item => <li key={item.title}>
        <strong className="product-delivery-title">{item.title}</strong>
        <p>{item.detail}</p>
        <p className="product-delivery-format"><span>형식 · {item.status}</span>{item.format}</p>
      </li>)}</ul>
    </div>)}
  </div>;
}
