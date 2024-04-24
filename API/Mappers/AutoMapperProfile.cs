using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Mappers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<InsertDto, Biljeska>();
            CreateMap<UpdateDto, Biljeska>();
        }
    }
}
