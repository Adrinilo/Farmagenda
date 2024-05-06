package com.adrinilo.farmagenda.dto;

import com.adrinilo.farmagenda.dto.PersonaDTO;

import java.util.List;

public class PersonaResponse {

    private List<PersonaDTO> contenido;
    private int pageNum;
    private int itemsPerPage;
    private long totalElements;
    private int totalPages;
    private boolean isLast;

    public PersonaResponse() {
    }

    public List<PersonaDTO> getContenido() {
        return contenido;
    }

    public void setContenido(List<PersonaDTO> contenido) {
        this.contenido = contenido;
    }

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public int getItemsPerPage() {
        return itemsPerPage;
    }

    public void setItemsPerPage(int itemsPerPage) {
        this.itemsPerPage = itemsPerPage;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public boolean isLast() {
        return isLast;
    }

    public void setLast(boolean last) {
        isLast = last;
    }
}
