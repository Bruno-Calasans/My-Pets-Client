
import axios from 'axios';

// react
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// helpers
import { getToken } from '../helpers/token';

// types
import {
  ApiUserEditSuccessResponse,
  ApiUserSuccessResponse,
  ApiErrorResponse,
  ApiPetSuccessResponse,
  ApiPetEditSuccessResponse,
  ApiPetAdoptionSuccessResponse,
} from "../types/api.type";

import { UserEdit } from '../types/user.type';

// custom hooks
import useFlash from './useFlash';

// api
import api from "../utils/api";
import { ApiPetsSuccessResponse } from './../types/api.type';

export default function useApi(){

    const [token, setToken] = useState(getToken())
    const { createMessage } = useFlash();
    const navigate = useNavigate()

    return {
      async checkUser() {
        try {
          const response = (await api
            .get("/user/check", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((rsp) => rsp.data)) as ApiUserSuccessResponse;
          return response;

        } catch (e: any) {
          if (axios.isAxiosError(e)) {
            const response = e.response?.data as ApiErrorResponse;
            createMessage({ msg: response.message, type: "error" });
            return response;
          }
        }
      },
      async getUserById(id: string) {

        try {
          const response = (await api
            .get(`/user/info/${id}`)
            .then((rsp) => rsp.data)) as ApiUserSuccessResponse;
          return response;

        } catch (e: any) {
          if (axios.isAxiosError(e)) {
            const response = e.response?.data as ApiErrorResponse;
            createMessage({ msg: response.message, type: "error" });
            return response;
          }
        }

      },
      async editUser(data: UserEdit) {
        try {
          const response = (await api
            .patch("/user/edit", data, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((rsp) => rsp.data)) as ApiUserEditSuccessResponse;

          createMessage({ msg: response.message, type: "success" });
          return response;
          
        } catch (e: any) {
          if (axios.isAxiosError(e)) {
            const response = e.response?.data as ApiErrorResponse;
            createMessage({ msg: response.message, type: "error" });
            return response;
          }
        }
      },
      async registerPet(pet: FormData) {
        try {
          const response = (await api
            .post("/pet/register", pet, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((rsp) => rsp.data)) as ApiPetSuccessResponse;

          createMessage({ msg: response.message, type: "success" });
          navigate("/user/mypets");
          return response;

        } catch (e: any) {
          if (axios.isAxiosError(e)) {
            const response = e.response?.data as ApiErrorResponse;
            createMessage({ msg: response.message, type: "error" });
            return response;
          }
        }
      },
      async getMyPets() {

        try {
          const response = (await api
            .get("/pet/mypets", {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((rsp) => rsp.data)) as ApiPetsSuccessResponse;
          return response;

        } catch (e: any) {
          if (axios.isAxiosError(e)) {
            const response = e.response?.data as ApiErrorResponse;
            createMessage({ msg: response.message, type: "error" });
            return response;
          }
        }
      },
      async removePetById(id: string) {

        try {
          const response = (await api
            .delete(`/pet/delete/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((rsp) => rsp.data)) as ApiPetSuccessResponse;
          createMessage({ msg: "Pet removido com sucesso", type: "success" });
          return response;

        } catch (e: any) {
          if (axios.isAxiosError(e)) {
            const response = e.response?.data as ApiErrorResponse;
            createMessage({ msg: response.message, type: "error" });
            return response;
          }
        }
      },
      async getAllPets() {
        
        try {
          const response = (await api
            .get(`/pet`)
            .then((rsp) => rsp.data)) as ApiPetsSuccessResponse
          return response;

        } catch (e: any) {
          if(axios.isAxiosError(e)){
            const response = e.response?.data as ApiErrorResponse;
            return response;
          }
        }
      },
      async getPetById(id: string){
        try {
          const response = (await api
            .get(`/pet/info/${id}`)
            .then((rsp) => rsp.data)) as  ApiPetSuccessResponse
          return response;

        } catch (e: any) {
          if(axios.isAxiosError(e)){
            const response = e.response?.data as ApiErrorResponse;
            return response;
          }
        }

      },
      async editPet(id: string, data: FormData) {
        try {
          const response = await api
            .patch(`/pet/edit/${id}`, data, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((rsp) => rsp.data) as ApiPetEditSuccessResponse;

          createMessage({ msg: response.message, type: "success" });
          navigate('/user/mypets')
          return response;

        } catch (e: any) {
          if(axios.isAxiosError(e)){
            const response = e.response?.data as ApiErrorResponse;
            createMessage({ msg: response.message, type: "error" });
            return response;
          }
        }
      },
      async getMyAdoptions() {

        try {
          const response = await api
            .get(`/pet/myadoptions`, {
              headers: {
                Authorization: `Bearer ${token}`
              },
            })
            .then((rsp) => rsp.data) as ApiPetsSuccessResponse;

          // createMessage({ msg: response.message, type: "success" });
          return response;

        } catch (e: any) {
          if(axios.isAxiosError(e)){
            const response = e.response?.data as ApiErrorResponse;
            createMessage({ msg: response.message, type: "error" });
            return response;
          }
        }
      },
      async scheduleAdoption(id: string) {
        try {
          const response = await api.patch(`/pet/adoption/schedule/${id}`, {}, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then((rsp) => rsp.data) as ApiPetAdoptionSuccessResponse;

          navigate('/user/myadoptions')
          createMessage({ msg: response.message, type: "success" });
          return response;

        } catch (e: any) {
          if(axios.isAxiosError(e)){
            const response = e.response?.data as ApiErrorResponse;
            createMessage({ msg: response.message, type: "error" });
            return response;
          }
        }
      },
      async finishAdoption(id: string){
        try {
          const response = await api
            .patch(`/pet/adoption/finish/${id}`, {}, {
              headers: {
                Authorization: `Bearer ${token}`
              },
            })
            .then((rsp) => rsp.data) as ApiPetAdoptionSuccessResponse;

          createMessage({ msg: response.message, type: "success" });
          return response;

        } catch (e: any) {
          if(axios.isAxiosError(e)){
            const response = e.response?.data as ApiErrorResponse;
            createMessage({ msg: response.message, type: "error" });
            return response;
          }
        }

      },
      async cancelAdoption(id: string){
        try {
          const response = await api
            .patch(`/pet/adoption/cancel/${id}`, {}, {
              headers: {
                Authorization: `Bearer ${token}`
              },
            })
            .then((rsp) => rsp.data) as ApiPetSuccessResponse;

          createMessage({ msg: response.message, type: "success" });
          return response;

        } catch (e: any) {
          if(axios.isAxiosError(e)){
            const response = e.response?.data as ApiErrorResponse;
            createMessage({ msg: response.message, type: "error" });
            return response;
          }
        }

      },
      async startReturn(id: string){
        try {
          const response = await api
            .patch(`/pet/return/start/${id}`, {}, {
              headers: {
                Authorization: `Bearer ${token}`
              },
            })
            .then((rsp) => rsp.data) as ApiPetSuccessResponse;

          createMessage({ msg: response.message, type: "success" });
          navigate('/user/myadoptions', {replace: true})
          return response;

        } catch (e: any) {
          const response = e.response?.data as ApiErrorResponse;
          createMessage({ msg: response.message, type: "error" });
          return response;
        }

      },
      async finishReturn(id: string){
        try {
          const response = await api
            .patch(`/pet/return/finish/${id}`, {}, {
              headers: {
                Authorization: `Bearer ${token}`
              },
            })
            .then((rsp) => rsp.data) as ApiPetSuccessResponse;

          createMessage({ msg: response.message, type: "success" });
          return response;

        } catch (e: any) {
          const response = e.response?.data as ApiErrorResponse;
          createMessage({ msg: response.message, type: "error" });
          return response;
        }

      },
      async cancelReturn(id: string){
        try {
          const response = await api
            .patch(`/pet/return/cancel/${id}`, {}, {
              headers: {
                Authorization: `Bearer ${token}`
              },
            })
            .then((rsp) => rsp.data) as ApiPetSuccessResponse;

          createMessage({ msg: response.message, type: "success" });
          return response;

        } catch (e: any) {
          const response = e.response?.data as ApiErrorResponse;
          createMessage({ msg: response.message, type: "error" });
          return response;
        }

      },

    }
}