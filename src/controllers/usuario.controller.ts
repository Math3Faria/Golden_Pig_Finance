import { Request, Response } from "express";
import { UsuarioService } from "../services/usuario.service";

export class UsuarioController {

    constructor(private service = new UsuarioService()) { }

    selecionaTodos = async (req: Request, res: Response) => {
        try {
            const usuarios = await this.service.selecionarTodos();
            const idUsuario = req.query.idUsuario;
            const email = req.query.email;

            if (idUsuario) {
                const result = await this.service.selecionarPorId(Number(idUsuario));
                return res.status(200).json({ usuarios: result });
            }

            if (email) {
                const resultEmail = await this.service.selecionarPorEmail(String(email));
                return res.status(200).json({ usuarios: resultEmail });
            }

            res.status(200).json({ usuarios })
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
            }
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            })
        }
    };


    criarUsuario = async (req: Request, res: Response) => {
        try {
            const { nome, email, senha } = req.body;

            const novo = await this.service.criarUsuario(nome, email, senha);

            return res.status(201).json({ message: "Usuário criado com sucesso", result: novo });

        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
            }
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            })
        }
    };

    editarUsuario = async (req: Request, res: Response) => {

        try {
            const idUsuario = Number(req.params.id);
            const { nome, email, senha } = req.body;

            if (isNaN(idUsuario)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            const alterado = await this.service.editarUsuario(
                idUsuario,
                nome,
                email,
                senha
            );

            return res.status(200).json({ message: "Atualizado com sucesso", result: alterado });

 } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
            }
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            })
        }
    };


    deletarUsuario = async (req: Request, res: Response) => {
        try {
            const idUsuario = Number(req.params.id);

            if (isNaN(idUsuario)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            await this.service.deletarUsuario(idUsuario);

            return res.status(200).json({ message: "Deletado com sucesso" });
   } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Ocorreu um erro no servidor',
                    errorMessage: error.message
                })
            }
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: 'Erro desconhecido'
            })
        }
    };
}