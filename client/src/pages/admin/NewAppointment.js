import React, { useState } from "react";
import { DGrid, DSection, Content } from "../../components/styled/containers";
import { DButton } from "../../components/styled/utils";
import { useForm } from "../../util/hooks/useForm";
import { Link, useHistory } from "react-router-dom";
import { Breadcrumb } from "semantic-ui-react";
import Layout from "../../components/admin/layout/Layout";
import NewUserAppointment from "../../components/admin/appointment/NewUserAppointment";
import NewAppointmentDetails from "../../components/admin/appointment/NewAppointmentDetails";
import NewConfirmation from "../../components/admin/appointment/NewConfirmation";

const NewAppointment = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { values, handleChange } = useForm({
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
  });

  const [categories, setCategories] = useState([]);
  const [service, setService] = useState([]);
  const [serviceEmp, setServiceEmp] = useState([]);
  const [categoryVal, setCategoryVal] = useState("");
  const [serviceValue, setServiceValue] = useState("");
  const [employeeVal, setEmployeeVal] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().setDate(new Date().getDate() + 1)
  );
  const [selectedTime, setSelectedTime] = useState("");

  console.log(values);
  return (
    <Layout>
      <DSection>
        <Content
          flex
          justify="space-between"
          align="center"
          width="100%"
          margin="24px auto"
        >
          <Breadcrumb size={"huge"}>
            <Breadcrumb.Section as={Link} to="/zeadmin/appointments">
              Appointment
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section as={Link} to="/zeadmin/appointments" active>
              New Appointment
            </Breadcrumb.Section>
          </Breadcrumb>
          <DButton>Existing Client</DButton>
        </Content>

        <DGrid two gap="24px">
          <NewUserAppointment values={values} valueChange={handleChange} />
          <NewAppointmentDetails
            categoryVal={categoryVal}
            setCategoryVal={setCategoryVal}
            categories={categories}
            service={service}
            employeeVal={employeeVal}
            setCategories={setCategories}
            setService={setService}
            setServiceEmp={setServiceEmp}
            serviceValue={serviceValue}
            setServiceValue={setServiceValue}
            setEmployeeVal={setEmployeeVal}
            startDate={startDate}
            setStartDate={setStartDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        </DGrid>
        <DButton size="50px" onClick={() => setOpen(true)}>
          Book an Appointment
        </DButton>
      </DSection>
      <NewConfirmation
        open={open}
        values={values}
        setOpen={setOpen}
        serviceValue={serviceValue}
        employeeVal={employeeVal}
        startDate={startDate}
        selectedTime={selectedTime}
      />
    </Layout>
  );
};

export default NewAppointment;
