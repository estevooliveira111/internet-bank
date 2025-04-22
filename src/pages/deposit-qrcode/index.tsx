import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { ArrowLeftIcon } from "../../components/icons/arrow-left";
import { useNotification } from "../../hooks/notification";
import { api } from "../../lib/axios";

import CopyToClipboard from "react-copy-to-clipboard";
import { PixKeyInputSelect } from "../../components/input/seleted-pix-keys";
import { useCustomer } from "@/hooks/customer";
import IntlCurrencyInput from "@/components/input/react-intl-currency-input/IntlCurrencyInput";

export interface Account {
  name: string;
  number: string;
  bankId: string;
  personType: string;
  documentNumber: string;
}

interface PixKey {
  accountId: string;
  updatedAt: number;
  status: string;
  account: Account;
  createdAt: number;
  key: string;
  type: string;
}

interface DataResponse {
  emv: string;
  id: string;
  qrcode: string;
}

export function DepositQrCode() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { showNotification, hidden } = useNotification();
  const [pixKeys, setPixKeys] = useState<PixKey[]>([]);
  const [data, setData] = useState<DataResponse>();
  const [amount, setAmount] = useState(0);
  const [, setMaskedValue] = useState("0,00");

  const { customer } = useCustomer();

  const [typeKey, setTypeKey] = useState({
    accountId: "",
    updatedAt: "",
    status: "",
    account: "",
    createdAt: "",
    key: "Selecione uma chave Pix",
    type: "",
  });

  useEffect(() => {
    fetchPixKeys();
  }, []);

  function handleBack() {
    navigate(-1);
  }

  async function fetchPixKeys() {
    await api
      .get("pix/keys/show-many")
      .then(({ data }) => {
        setPixKeys(data.keys);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function handleGenerateQrCode() {
    try {
      const { data } = await api.post("/qrcode/static", {
        key: typeKey.key,
        city: "Belo Horizonte",
        amount: customer.display_name === "BANDEC" ? amount : undefined,
      });

      setData(data);
      setStep(2);
      setLoading(false);
      showNotification({
        type: "success",
        title: "QR Code Gerado",
        message: "QR Code Gerado com sucesso.",
      });

      setTimeout(() => {
        hidden();
      }, 3000);
    } catch (e) {
      showNotification({
        type: "error",
        title: "Erro ao continuar",
        message: "Ocorreu um erro ao gerar o QR code.",
      });
      setTimeout(() => {
        hidden();
      }, 2000);
      setLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    hidden();

    setLoading(true);
    if (customer.display_name === "BANDEC") {
      if (amount <= 0) {
        showNotification({
          type: "error",
          title: "Erro ao continuar",
          message: "É preciso informar um valor válido.",
        });
        setLoading(false);
        return;
      }
    } else {
      if (typeKey.key === "" || typeKey.key === "Selecione uma chave Pix") {
        showNotification({
          type: "error",
          title: "Erro ao continuar",
          message: "É preciso selecionar uma chave.",
        });
        setLoading(false);
        return;
      }
    }

    try {
      handleGenerateQrCode();
    } catch (e) {
      console.log(e);
    }
  }

  const handleChange = (
    event: FormEvent,
    value: number,
    maskedValue: string,
  ) => {
    event.preventDefault();

    setAmount(value);
    setMaskedValue(maskedValue);
  };

  return (
    <div className="h-full min-h-screen p-8">
      <div className="mb-6 flex items-center">
        <div
          className="mr-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded bg-white hover:opacity-80"
          onClick={() => {
            step === 1 ? handleBack() : handleBack();
          }}
        >
          <ArrowLeftIcon color="var(--primary)" width={10} />
        </div>
        <div>
          <h1 className="block text-2xl text-tx-primary">
            {step === 1 ? " Gerar QR Code" : "Qr Code Gerado"}
          </h1>
          {customer.display_name !== "BANDEC" && (
            <span className="block">
              {step === 1
                ? "Escolha uma chave pix para gerar o QR code"
                : "Aponte seu celular para o Qr Code e efetue o depósito"}
            </span>
          )}
        </div>
      </div>
      {step === 1 && (
        <form
          className="inline-flex w-full flex-col rounded bg-white p-6"
          onSubmit={handleSubmit}
        >
          {customer.display_name !== "BANDEC" && (
            <PixKeyInputSelect
              label="Tipo de chave"
              options={pixKeys}
              selected={typeKey}
              onChange={setTypeKey}
            />
          )}

          {customer.display_name === "BANDEC" && (
            <div className="mb-6 w-1/2 rounded-md border border-main-gray px-3 pb-1.5 pt-2.5 shadow-sm ring-0">
              <p>Valor</p>
              <IntlCurrencyInput
                currency="BRL"
                className="text-md"
                config={{
                  locale: "pt-BR",
                  formats: {
                    number: {
                      BRL: {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      },
                    },
                  },
                }}
                value={amount}
                onChange={(
                  event: FormEvent<Element>,
                  value: number,
                  masked: string,
                ) => handleChange(event, value, masked)}
              />
            </div>
          )}

          <div className="flex max-w-[492px] flex-row justify-between">
            <Button
              className="flex w-full items-center justify-center rounded-md bg-[var(--gray-light-line)] px-3 py-3 text-center text-main-white hover:bg-main-gray md:w-auto md:min-w-[240px]"
              title={"Cancelar"}
              type="button"
              onClick={() => {
                step === 1 ? handleBack() : setStep(1);
              }}
            />
            <Button
              title={"Gerar QR Code"}
              type="submit"
              loading={loading}
              disabled={loading}
            />
          </div>
        </form>
      )}

      {step === 2 && (
        <form
          className="inline-flex w-full flex-col items-center rounded bg-[#EAEAEA] p-6 md:w-[492px]"
          onSubmit={handleSubmit}
        >
            <img src={`${data?.qrcode}`} alt="Imagem" />
          <div className="mt-4 break-all">{data?.emv}</div>
          <div className="mt-4 flex max-w-[492px] flex-row justify-between">
            <CopyToClipboard
              text={data?.emv || ""}
              onCopy={() => {
                showNotification({
                  type: "success",
                  title: "Copiado",
                  message: "Código copiado com sucesso",
                });

                setTimeout(() => {
                  hidden();
                }, 1000);
              }}
            >
              <Button
                className="flex w-full items-center justify-center rounded-md bg-primary px-3 py-3 text-center text-main-white hover:bg-main-gray md:w-auto md:min-w-[240px]"
                title={"Copiar código copia e cola"}
                type="button"
              />
            </CopyToClipboard>
          </div>
        </form>
      )}
    </div>
  );
}
