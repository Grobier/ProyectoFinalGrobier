import ServiceCard from "./ServiceCard";

function ServiceList({ services }) {
  return (
    <div className="row">
      {services.map((service) => (
        <div className="col-md-4" key={service.id}>
          <ServiceCard
            id={service.id}
            title={service.title}
            description={service.description}
            price={service.price}
          />
        </div>
      ))}
    </div>
  );
}

export default ServiceList;
